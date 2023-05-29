import { Calendar } from "@/components/Calendar";

export default function Fashion() {
  return (
    <main className="-">
      <h3>Fashion</h3>
      <div className="w-full">
        <h3 className="mb-4">Calendar</h3>
        <Calendar tagFilter="fashion" />
      </div>
    </main>
  );
}
