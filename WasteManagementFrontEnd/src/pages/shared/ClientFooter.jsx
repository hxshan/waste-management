import React from 'react'

const ClientFooter = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 mb-2" />
            <div className="flex space-x-2 mt-2">
              <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="font-semibold mb-2">Solution</h3>
            <ul className="text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Marketing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Analytics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Commerce</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Insights</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">API Status</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="text-sm">
              <li><a href="#" className="text-gray-600 hover:text-gray-800">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Jobs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-800">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>© 2024 Website. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-600 hover:text-blue-800">Terms & Conditions</a>
            <span className="mx-2">|</span>
            <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ClientFooter