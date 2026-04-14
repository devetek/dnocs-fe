import { SiGithub } from '@icons-pack/react-simple-icons';

import { Button } from '@/shared/presentation/atoms/Button';

interface Props {
  onClick: () => void;
}

export default function GithubLoginWall(props: Props) {
  const { onClick } = props;

  return (
    <div className="w-full h-[200px] border rounded-lg flex flex-col items-center justify-center">
      <Button variant="secondary" onClick={onClick}>
        <SiGithub /> Connect to GitHub
      </Button>
    </div>
  );
}
