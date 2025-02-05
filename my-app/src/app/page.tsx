import { supabase } from "../../lib/supabaseClient";


export default async function Home() {
  const data = await supabase.from("test2").select()

  console.log(data)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
     
    </div>
  );
}
