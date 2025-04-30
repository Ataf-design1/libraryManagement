import React from 'react'
import { BookOpen } from 'lucide-react'

const Footer = () => {
  return (
    <div>
         <footer className="mt-5 bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen size={20} className="mr-2" />
                Librio
              </h3>
              <p className="text-indigo-200">
                Your gateway to knowledge and imagination. Discover new worlds through reading.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-indigo-200 mb-2">123 Reading Lane</p>
              <p className="text-indigo-200 mb-2">Booktown, BT 12345</p>
              <p className="text-indigo-200 mb-2">info@libraryportal.com</p>
              <p className="text-indigo-200">+1 (555) 123-4567</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Hours</h3>
              <p className="text-indigo-200 mb-2">Monday - Friday: 9am - 9pm</p>
              <p className="text-indigo-200 mb-2">Saturday: 10am - 6pm</p>
              <p className="text-indigo-200">Sunday: 12pm - 5pm</p>
            </div>
          </div>
          
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-300">
            <p>&copy; 2025 Librio Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer