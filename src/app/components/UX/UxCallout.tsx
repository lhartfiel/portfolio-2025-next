const UxCallout = ({ callout }: { callout: string }) => {
  return (
    <div className="callout my-8">
      <div className="divider border-t-1 border-t-primary w-[85%]"></div>
      <p className="text-h3-sm md:text-h3 text-primary lh-[36px] font-kanit font-semibold py-5 ml-6">
        {callout}
      </p>
      <div className="divider border-t-1 border-t-primary w-[85%] right-0 ml-auto"></div>
    </div>
  );
};

export { UxCallout };
