import { useState } from 'react';

import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import {
  AlertTriangleIcon,
  CalendarIcon,
  CheckIcon,
  ClipboardIcon,
  EyeIcon,
  EyeOffIcon,
  GlobeIcon,
  KeyRoundIcon,
  LockIcon,
  RulerIcon,
  Trash2Icon,
} from 'lucide-react';

import { useDialog } from '@/services/dialog';
import { useToaster } from '@/services/toaster';

import type { DTOs } from '@/shared/api';
import { ApiSecret } from '@/shared/api';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { cn } from '@/shared/libs/tailwind/cn';

interface ModeSSHKeyProps {
  sshkey: DTOs.SshKeyV1;
  refresh: () => void;
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text manually
    }
  };

  return (
    <Button size="sm" variant="secondary" onClick={handleCopy}>
      {copied ? (
        <CheckIcon className="w-3.5 h-3.5 mr-1.5 text-green-500" />
      ) : (
        <ClipboardIcon className="w-3.5 h-3.5 mr-1.5" />
      )}
      {copied ? 'Copied!' : (label ?? 'Copy')}
    </Button>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof KeyRoundIcon;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs text-primary/50 flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {label}
      </p>
      <p className="text-sm font-medium break-all">{value ?? '—'}</p>
    </div>
  );
}

export default function ModeSshKey({ sshkey, refresh }: ModeSSHKeyProps) {
  const [privateRevealed, setPrivateRevealed] = useState(false);

  const sshKeyID = sshkey.id ?? 0;
  const sshKeyName = sshkey.name ?? '';
  const sshPrivKey = sshkey.data?.private ?? '';
  const sshPubKey = sshkey.data?.public ?? '';
  const keyLength = sshkey.data?.length ?? '';
  const keyType = sshkey.type ?? '';
  const createdAt = sshkey.created_at
    ? dayjs(sshkey.created_at).format('YYYY-MM-DD HH:mm:ss')
    : null;
  const updatedAt = sshkey.updated_at
    ? dayjs(sshkey.updated_at).format('YYYY-MM-DD HH:mm:ss')
    : null;

  const navigate = useNavigate();
  const [openToaster] = useToaster();
  const [openDialog] = useDialog();

  const handleDelete = () => {
    openDialog({
      title: 'Delete SSH Key',
      content: (
        <>
          Are you sure you want to delete <br />
          <code>{sshKeyName}</code>? This action cannot be undone.
        </>
      ),
      variant: 'warning',
      actions: {
        variant: 'YesNo',
        yes: async () => {
          const res = await ApiSecret.SshKey.Delete.$Id.doDelete({
            id: String(sshKeyID),
          });

          if (res.$status === 'success') {
            openToaster({
              variant: 'success',
              message: (
                <>
                  SSH key <code>{sshKeyName}</code> deleted successfully.
                </>
              ),
            });
            navigate({ to: '/backend/secret-managers/ssh-key', replace: true });
            return;
          }

          openToaster({
            variant: 'error',
            title: <>Failed to delete SSH key</>,
            message: res.error.message,
          });
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Metadata */}
      <Card className="p-4">
        <p className="text-xs font-semibold text-primary/50 uppercase tracking-wide mb-3">
          Key Information
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MetaItem icon={KeyRoundIcon} label="Name" value={sshKeyName} />
          <MetaItem icon={KeyRoundIcon} label="Type" value={keyType} />
          <MetaItem icon={RulerIcon} label="Bit Length" value={keyLength} />
          <MetaItem icon={CalendarIcon} label="Created" value={createdAt} />
          <MetaItem icon={CalendarIcon} label="Last Updated" value={updatedAt} />
        </div>
      </Card>

      {/* Public Key */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between gap-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-primary/60" />
            Public Key
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary/50">
              Safe to share with servers
            </span>
            <CopyButton text={sshPubKey} label="Copy Public Key" />
          </div>
        </div>
        <div className="p-4 bg-muted/30">
          <pre className="font-mono text-xs leading-relaxed break-all whitespace-pre-wrap text-primary/80 max-h-48 overflow-y-auto">
            {sshPubKey || <em className="opacity-40">No public key data</em>}
          </pre>
        </div>
      </Card>

      {/* Private Key */}
      <Card
        className={cn(
          'overflow-hidden transition-colors',
          privateRevealed ? 'border-amber-500/40' : '',
        )}
      >
        <div className="px-4 py-3 border-b flex items-center justify-between gap-2">
          <p className="text-sm font-semibold flex items-center gap-2">
            <LockIcon className="w-4 h-4 text-amber-500" />
            Private Key
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPrivateRevealed((v) => !v)}
            >
              {privateRevealed ? (
                <EyeOffIcon className="w-4 h-4 mr-1.5" />
              ) : (
                <EyeIcon className="w-4 h-4 mr-1.5" />
              )}
              {privateRevealed ? 'Hide' : 'Reveal'}
            </Button>
            {privateRevealed && (
              <CopyButton text={sshPrivKey} label="Copy Private Key" />
            )}
          </div>
        </div>

        <div
          className={cn(
            'p-4 transition-colors',
            privateRevealed ? 'bg-amber-500/5' : 'bg-muted/20',
          )}
        >
          <div className="flex items-start gap-2 mb-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangleIcon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-600 leading-relaxed">
              <strong>Keep this key secret.</strong> Never share your private
              key with anyone. Anyone with access to this key can log in to
              your servers.
            </p>
          </div>

          {privateRevealed ? (
            <pre className="font-mono text-xs leading-relaxed break-all whitespace-pre-wrap text-primary/80 max-h-64 overflow-y-auto">
              {sshPrivKey || <em className="opacity-40">No private key data</em>}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-16 select-none">
              <p className="font-mono text-2xl tracking-widest text-primary/20">
                ● ● ● ● ● ● ● ● ● ●
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500/20 overflow-hidden">
        <div className="px-4 py-3 border-b border-red-500/20 bg-red-500/5">
          <p className="text-sm font-semibold text-red-500">Danger Zone</p>
        </div>
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">Delete this SSH key</p>
            <p className="text-xs text-primary/50">
              Once deleted, this key cannot be recovered. Any server configured
              to use it will require a new key.
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="shrink-0"
            onClick={handleDelete}
          >
            <Trash2Icon className="w-4 h-4 mr-1.5" />
            Delete Key
          </Button>
        </div>
      </Card>
    </div>
  );
}
