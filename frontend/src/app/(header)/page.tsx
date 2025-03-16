import { Products } from "@/components/Products";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      // <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        // <div className="text-6xl font-bold">Welcome to Shoppers Avenue</div>
        <div className="px-10 py-5">
          <h1 className="text-3xl font-bold">Welcome to Shoppers Avenue</h1>
          <div className="py-5">
            <Products />
          </div>
        </div>
      // </main>
    // </div>
  );
}
