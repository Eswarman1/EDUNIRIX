import { Link, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home }
    // Add other navigation items here if needed
  ]

  return (
    // Use background-dark for default, light mode handled by global index.css
    <nav className="bg-background-dark shadow-lg border-b border-gray-700 light:bg-white light:border-gray-200 transition-colors duration-200"> {/* Updated background/border */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            {/* EDUNIRIX Logo - Updated path */}
            <img src="/EdunirixLogo.png" alt="EDUNIRIX Logo" className="h-8 w-8 rounded-full filter invert dark:filter-none" /> {/* Assuming logo is in public folder */}

            {/* Or if you prefer text */}
             <span className="text-xl font-bold text-text-light dark:text-gray-800 light:text-gray-800">EDUNIRIX</span> {/* Adjusted text color */}
          </Link>

          <div className="flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  location.pathname === path
                    ? 'text-gold-accent-400 bg-gray-800 light:bg-primary-50 light:text-primary-600' // Use gold for active link in dark mode, primary in light
                    : 'text-text-muted hover:text-gold-accent-400 hover:bg-gray-700 light:text-gray-600 light:hover:text-primary-600 light:hover:bg-gray-100' // Use text-muted and gold hover in dark, gray and primary hover in light
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar