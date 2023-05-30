"use client";

import { MONTHS } from "@/constants";
import { fetchAPI } from "@/lib/api";
import { CalendarEvent, StrapiObject } from "@/types";
import React, { useEffect, useMemo, useRef, useState } from "react";

const EVENT_TAG_MAP: Record<CalendarEvent["Tag"], string> = {
  art: "Art",
  fashion: "Fashion",
  social: "Social",
  food: "Food",
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

type CalendarProps = {
  tagFilter?: CalendarEvent["Tag"];
};

export const Calendar: React.FC<CalendarProps> = ({ tagFilter }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();
    return date.getMonth();
  });

  const [currentYear, setCurrentYear] = useState(() => {
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

  const [calendarEvents, setCalendarEvents] = useState<
    StrapiObject<CalendarEvent>[] | null
  >(null);

  const fetchData = async () => {
    const [calendarEvents] = await Promise.all([
      fetchAPI<StrapiObject<CalendarEvent>[]>("/events", { populate: "*" }),
    ]);
    setCalendarEvents(calendarEvents.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEvents = useMemo(() => {
    return (
      // remove past events
      calendarEvents
        ?.filter((event) => {
          return (
            new Date(event.attributes.EndDate).getTime() > new Date().getTime()
          );
        })
        // filter to date range
        .filter((event) => {
          return (
            new Date(event.attributes.StartDate).getTime() >
              selectedTimeRange.start &&
            new Date(event.attributes.StartDate).getTime() <
              selectedTimeRange.end
          );
        })
        // of the current tag
        ?.filter((event) =>
          tagFilter ? event.attributes.Tag === tagFilter : true
        )
        // sort by date
        .sort(
          (eventA, eventB) =>
            new Date(eventA.attributes.StartDate).getTime() -
            new Date(eventB.attributes.StartDate).getTime()
        )
    );
  }, [tagFilter, selectedTimeRange, calendarEvents]);

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
        {filteredEvents ? (
          filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div
                className={`${
                  index !== filteredEvents.length - 1 ? "mb-8" : ""
                }`}
                key={event.id}
              >
                <p>
                  <b>{EVENT_TAG_MAP[event.attributes.Tag]}</b>
                </p>
                <h4 className="mb-2">{event.attributes.Name}</h4>
                <p>
                  <b>{new Date(event.attributes.StartDate).toDateString()} </b>
                </p>
                <p className="mb-2">
                  {" "}
                  {new Date(event.attributes.StartDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  -
                  {new Date(event.attributes.EndDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                </p>
                <p>{event.attributes.Description}</p>
              </div>
            ))
          ) : (
            <p>
              No upcoming events in{" "}
              {MONTHS[new Date(selectedTimeRange.start).getMonth()]}{" "}
              {new Date(selectedTimeRange.start).getFullYear()}
            </p>
          )
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};
