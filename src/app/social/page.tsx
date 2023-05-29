import { Calendar } from "@/components/Calendar";

export default function Arts() {
  return (
    <main className="-">
      <h3>Social</h3>
      <div className="w-full">
        <h3 className="mb-4">Calendar</h3>
        <Calendar tagFilter="food" />
      </div>
    </main>
  );
}
