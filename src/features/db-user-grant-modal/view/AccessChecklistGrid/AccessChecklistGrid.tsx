import { Checkbox } from '@/shared/presentation/atoms/Checkbox';

import { useDugContext } from '../../model';

export default function AccessChecklistGrid() {
  const { accessList, checkedAccess, setCheckedAccess } = useDugContext();

  const checkedAll = checkedAccess.length === accessList.length;

  const handleClickGrantAllOrNone = () => {
    if (!checkedAll) {
      setCheckedAccess(accessList);
    } else {
      setCheckedAccess([]);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Access</p>

        <div className="flex items-center gap-4">
          {/* Button toggle */}
          <button
            className="text-sm font-medium cursor-pointer"
            onClick={handleClickGrantAllOrNone}
          >
            Grant {checkedAll ? 'None' : 'All'}
          </button>
        </div>
      </div>

      <div className="rounded-md bg-background px-3 py-2">
        <div className="flex gap-y-2 flex-wrap">
          {accessList.map((item) => {
            const foundIndex = checkedAccess.findIndex(
              (value) => value === item,
            );

            const handleClick = () => {
              setCheckedAccess((prevChecklists) => {
                let newChecklists = [...prevChecklists];

                if (foundIndex > -1) {
                  newChecklists.splice(foundIndex, 1);
                } else {
                  newChecklists = [...newChecklists, item];
                }

                return newChecklists;
              });
            };

            return (
              <div
                key={item}
                className=" flex basis-[50%] sm:basis-[30%] gap-2 items-center"
              >
                <Checkbox checked={foundIndex > -1} onClick={handleClick} />
                <code className="cursor-pointer" onClick={handleClick}>
                  {item}
                </code>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
