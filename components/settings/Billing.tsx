import NoContent from "../atoms/NoContent";

export default function Billing() {
  return (
    <div className="bg-white h-full overflow-scroll rounded-lg border p-4">
      <div className="grid text-sm text-black gap-4">
        <h2 className="text-lg font-bold">Billing</h2>
        <hr className="border-gray-100" />
        <NoContent
          title="Billing"
          description="Billing management is not available yet."
        />
      </div>
    </div>
  );
}
