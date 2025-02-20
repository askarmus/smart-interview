import React from "react";

const featureList = [
  { title: "Payroll", description: "Track salaries and payments." },
  { title: "Claim expenses", description: "Keep all receipts in one place." },
  { title: "VAT handling", description: "We handle VAT automatically." },
  { title: "Reporting", description: "Export data into Excel spreadsheets." },
];

export const Features = () => {
  return (
    <section
      id="features"
      aria-label="Features for running your books"
      className="relative overflow-hidden bg-blue-600 pt-20 pb-28 sm:py-32"
    >
      <img
        alt=""
        loading="lazy"
        width={2245}
        height={1636}
        decoding="async"
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]"
        src="/background-features.5f7a9ac9.jpg"
        style={{ color: "transparent" }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
            Everything you need to run your books.
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-100">
            Well everything you need if you aren’t that picky about minor
            details like tax compliance.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
          <div className="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
            <div
              className="relative z-10 flex gap-x-4 px-4 whitespace-nowrap sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal"
              role="tablist"
              aria-orientation="vertical"
            >
              <div className="group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 bg-white lg:bg-white/10 lg:ring-1 lg:ring-white/10 lg:ring-inset">
                <h3>
                  <button
                    className="font-display text-lg data-selected:not-data-focus:outline-hidden text-blue-600 lg:text-white"
                    id="headlessui-tabs-tab-:r3u:"
                    role="tab"
                    type="button"
                    aria-selected="true"
                    tabIndex={0}
                    data-headlessui-state="selected"
                    data-selected=""
                    aria-controls="headlessui-tabs-panel-:r46:"
                  >
                    <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                    Payroll
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm lg:block text-white">
                  Keep track of everyone s salaries and whether or not they ve
                  been paid. Direct deposit not supported.
                </p>
              </div>
              <div className="group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 hover:bg-white/10 lg:hover:bg-white/5">
                <h3>
                  <button
                    className="font-display text-lg data-selected:not-data-focus:outline-hidden text-blue-100 hover:text-white lg:text-white"
                    id="headlessui-tabs-tab-:r40:"
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex={-1}
                    data-headlessui-state=""
                    aria-controls="headlessui-tabs-panel-:r48:"
                  >
                    <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                    Claim expenses
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm lg:block text-blue-100 group-hover:text-white">
                  All of your receipts organized into one place, as long as you
                  don t mind typing in the data by hand.
                </p>
              </div>
              <div className="group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 hover:bg-white/10 lg:hover:bg-white/5">
                <h3>
                  <button
                    className="font-display text-lg data-selected:not-data-focus:outline-hidden text-blue-100 hover:text-white lg:text-white"
                    id="headlessui-tabs-tab-:r42:"
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex={-1}
                    data-headlessui-state=""
                    aria-controls="headlessui-tabs-panel-:r4a:"
                  >
                    <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                    VAT handling
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm lg:block text-blue-100 group-hover:text-white">
                  We only sell our software to companies who dont deal with VAT
                  at all, so technically we do all the VAT stuff they need.
                </p>
              </div>
              <div className="group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6 hover:bg-white/10 lg:hover:bg-white/5">
                <h3>
                  <button
                    className="font-display text-lg data-selected:not-data-focus:outline-hidden text-blue-100 hover:text-white lg:text-white"
                    id="headlessui-tabs-tab-:r44:"
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex={-1}
                    data-headlessui-state=""
                    aria-controls="headlessui-tabs-panel-:r4c:"
                  >
                    <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                    Reporting
                  </button>
                </h3>
                <p className="mt-2 hidden text-sm lg:block text-blue-100 group-hover:text-white">
                  Easily export your data into an Excel spreadsheet where you
                  can do whatever the hell you want with it.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div
              id="headlessui-tabs-panel-:r46:"
              role="tabpanel"
              tabIndex={0}
              data-headlessui-state="selected"
              data-selected=""
              aria-labelledby="headlessui-tabs-tab-:r3u:"
            >
              <div className="relative sm:px-6 lg:hidden">
                <div className="absolute -inset-x-4 top-[-6.5rem] bottom-[-4.25rem] bg-white/10 ring-1 ring-white/10 ring-inset sm:inset-x-0 sm:rounded-t-xl" />
                <p className="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                  Keep track of everyones salaries and whether or not they ve
                  been paid. Direct deposit not supported.
                </p>
              </div>
              <div className="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-blue-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
                <img
                  alt=""
                  width={2174}
                  height={1464}
                  className="w-full"
                  sizes="(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem"
                  src="/payroll.webp"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
