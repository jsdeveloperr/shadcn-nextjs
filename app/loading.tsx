import SkeletonCard from "@/components/SkeletonCard";

const counters = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function Loading() {
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {counters.map((index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </main>
  );
}
