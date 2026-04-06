import Image from "next/image";
import { extracurriculars } from "@/data";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const Extracurriculars = () => {
  return (
    <section id="extracurriculars" className="py-20 px-4">
      <h1 className="heading mb-16">
        Extracurricular <span className="text-purple">Activities</span>
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {extracurriculars.map((item) => (
          <div
            key={item.id}
            className="bg-black/50 border border-white/10 rounded-xl p-6 backdrop-blur-sm hover:border-purple/30 transition-all duration-300"
          >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
              <Image
                src={`${BASE}/${item.image}`}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-white mt-5">{item.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{item.role}</p>
            <p className="text-gray-300 mt-3 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Extracurriculars;
