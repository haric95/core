"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Event = {
  id: string;
  title: string;
  description: string;
  start: string; // ISO 8601
  end: string; // ISO 8601
  tag: "art" | "fashion" | "social" | "food";
};

const EVENT_TAG_MAP: Record<Event["tag"], string> = {
  art: "Art",
  fashion: "Fashion",
  social: "Social",
  food: "Food",
};

const events: Event[] = [
  {
    id: "dsadbb",
    title: "Human Ecology Workshop - 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenasaccumsan consectetur lectus, a efficitur elit convallis ac. Donec vel lectus libero.",
    tag: "social",
    start: "2023-05-29T14:00:00.000Z",
    end: "2023-05-29T16:00:00.000Z",
  },
  {
    id: "dsadbba",
    title: "Human Ecology Workshop - 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenasaccumsan consectetur lectus, a efficitur elit convallis ac. Donec vel lectus libero.",
    tag: "social",
    start: "2023-05-30T14:00:00.000Z",
    end: "2023-05-30T16:00:00.000Z",
  },
  {
    id: "dsadabab",
    title: "Human Ecology Workshop - 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenasaccumsan consectetur lectus, a efficitur elit convallis ac. Donec vel lectus libero.",
    tag: "social",
    start: "2023-05-31T14:00:00.000Z",
    end: "2023-05-31T16:00:00.000Z",
  },
  {
    id: "dsadbab",
    title: "Crafting Workshop - 1",
    description:
      "consectetur adipiscing elit. Maecenasaccumsan consectetur lectus, a efficitur elit convallis ac. Donec vel lectus libero.",
    tag: "social",
    start: "2023-06-29T14:00:00.000Z",
    end: "2023-06-29T16:00:00.000Z",
  },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type CalendarProps = {
  tagFilter?: Event["tag"];
};

const monthAndYearToDate = (month: number, year: number) => {
  return new Date(
    `${year}-${(month + 1).toString().padStart(2, "0")}-01T00:00:00.000Z`
  ).getTime();
};

const getStartOfNextMonth = (date: number) => {
  const dateObj = new Date(date);
  const startOfThisMonth = new Date(
    `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-01T00:00:00.000Z`
  );
  startOfThisMonth.setMonth(startOfThisMonth.getMonth() + 1);
  return startOfThisMonth.getTime();
};

export const Calendar: React.FC<CalendarProps> = ({ tagFilter }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();
    return date.getMonth();
  });

  const [currentYear, _] = useState(() => {
    const date = new Date();
    return date.getFullYear();
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState<{
    start: number;
    end: number;
  }>(() => {
    const d = new Date().getTime();
    return { start: d, end: getStartOfNextMonth(d) };
  });

  const filteredEvents = useMemo(() => {
    return (
      events
        .filter((event) => {
          return new Date(event.end).getTime() > new Date().getTime();
        })
        // filter to date range
        .filter((event) => {
          return (
            new Date(event.start).getTime() > selectedTimeRange.start &&
            new Date(event.start).getTime() < selectedTimeRange.end
          );
        })
        // of the current tag
        .filter((event) => (tagFilter ? event.tag === tagFilter : true))
        // sort by date
        .sort(
          (eventA, eventB) =>
            new Date(eventA.start).getTime() - new Date(eventB.start).getTime()
        )
    );
  }, [tagFilter, selectedTimeRange]);

  const generateMonthsArray = (startMonth: number) => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(startMonth + i);
    }
    return months;
  };

  const eventContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (eventContainerRef.current) {
      eventContainerRef.current.scrollTo({ top: 0 });
    }
  }, [selectedTimeRange]);

  return (
    <div className="flex flex-col md:flex-row justify-between md:h-64">
      <div className="w-full h-32 md:h-auto md:w-1/4 flex md:flex-col items-center md:items-left md:border-r-2 border-black overflow-y-auto">
        {generateMonthsArray(currentMonth).map((_, index) => {
          const month = (index + currentMonth) % 12;
          const year = currentYear + Math.floor((currentMonth + index) / 12);
          return (
            <>
              {(index === 0 || month === 0) && (
                <h4 className="text-left w-full pr-4 mr-4 border-r-2 border-black md:border-0 md:mr-0 md:pr-0">
                  <b>{year}</b>
                </h4>
              )}
              <button
                key={index}
                className="h-12 md:mr-0 mr-4"
                onClick={() => {
                  setSelectedTimeRange({
                    start: monthAndYearToDate(month, year),
                    end: getStartOfNextMonth(monthAndYearToDate(month, year)),
                  });
                }}
              >
                <h4
                  className={`${
                    monthAndYearToDate(month, year) == selectedTimeRange.start
                      ? "font-bold"
                      : ""
                  } ${month === 11 ? "mr-8 md:mr-0 md:mb-8" : ""}`}
                >
                  {MONTHS[(index + currentMonth) % 12]}
                </h4>
              </button>
            </>
          );
        })}
      </div>
      <div
        className="w-full md:w-[60%] text-right overflow-x-auto md:mt-0"
        ref={eventContainerRef}
      >
        {filteredEvents.map((event, index) => (
          <div
            className={`${index !== filteredEvents.length - 1 ? "mb-8" : ""}`}
            key={event.id}
          >
            <p>
              <b>{EVENT_TAG_MAP[event.tag]}</b>
            </p>
            <h4 className="mb-2">{event.title}</h4>
            <p>
              <b>{new Date(event.start).toDateString()} </b>
            </p>
            <p className="mb-2">
              {" "}
              {new Date(event.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              -
              {new Date(event.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
