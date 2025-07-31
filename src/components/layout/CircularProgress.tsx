const CircularProgress = ({full}:{full?:boolean}) => {
  return (
    <div className={`flex justify-center items-center  ${full ? 'h-screen' : ''}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-8 border-b-8 border-dotted border-brand-700">
        {/* <OrbitProgress variant="dotted" color="#082f49" size="small" /> */}
      </div>
    </div>
  )
}

export default CircularProgress
