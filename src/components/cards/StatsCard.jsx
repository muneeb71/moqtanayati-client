
const StatsCard = ({className, text, count}) => {
  return (
    <div className={`rounded-2xl ${className}`}>
        <p className="text-delftBlue font-light xl:text-[22px] text-[18px]">
            {text}
        </p>
        <p className="text-delftBlue font-semibold xl:text-[32px] text-[26px]">
            {count}
        </p>
    </div>
  )
}

export default StatsCard