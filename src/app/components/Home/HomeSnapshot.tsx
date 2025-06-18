import parse from "html-react-parser";

type Snapshot = {
  description: string;
  value: string;
};
const HomeSnapshot = ({
  snapshotHeading,
  snapshots,
}: {
  snapshotHeading: string;
  snapshots: Snapshot[];
}) => {
  return (
    <section className="px-6 grid grid-cols-4 col-span-4 md:grid-cols-12 gap-x-6 w-full justify-center items-center bg-white text-black pb-7 md:pb-11">
      <div className="divider col-span-4 col-start-1 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 border-t-1 border-t-black pb-7 md:pb-11"></div>
      <h2 className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-8 xl:col-start-3 text-h2-sm md:text-h2 font-kanit font-bold text-center w-full mb-12">
        {snapshotHeading}
      </h2>
      <div className="snapshot flex flex-nowrap justify-between col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-2 xl:col-span-6 xl:col-start-4 w-1-3">
        {snapshots?.length > 0 &&
          snapshots.map((snapshot) => {
            return (
              <div
                key={snapshot.value}
                className="w-full mr-6 md:mr-11 last:mr-0"
              >
                <p className="font-kanit font-bold text-primary text-center text-[28px] md:text-4xl bg-secondary px-4 py-3 mb-4">
                  {snapshot.value}
                </p>
                {snapshot.description && (
                  <div className="text-body-min md:text-body-min text-center">
                    {parse(snapshot.description)}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export { HomeSnapshot };
