import Hero from './Hero'
import Features from './Features'
import Testimonial from './Testimonial'
import Work from './Work'

function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <Features />
      <Work />
      <Testimonial />
    </div>
  );
}

export default Home