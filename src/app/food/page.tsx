import { Calendar } from "@/components/Calendar";

export default function Food() {
  return (
    <main className="-">
      <h3>Food</h3>
      <div className="w-full">
        <h3 className="mb-4">Calendar</h3>
        <Calendar tagFilter="food" />
      </div>
    </main>
  );
}
