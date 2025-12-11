import { Checkbox } from '@/shared/presentation/atoms/Checkbox';

import { useDugContext } from '../../model';

export default function AdditionalChecklist() {
  const { checkWithGrantOpt, setCheckWithGrantOpt } = useDugContext();

  const handleClickWGO = () => {
    setCheckWithGrantOpt((value) => !value);
  };

  return (
    <>
      <p className="text-sm font-medium">Additional</p>

      <div className=" flex gap-2 items-center">
        <Checkbox checked={checkWithGrantOpt} onClick={handleClickWGO} />
        <p
          className="cursor-pointer text-sm font-medium"
          onClick={handleClickWGO}
        >
          With Grant Option
        </p>
      </div>
    </>
  );
}
