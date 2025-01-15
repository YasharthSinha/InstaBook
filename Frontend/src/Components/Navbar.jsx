
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import './Navbar.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const apiKey = '71e6df92a17943189a189ed6c2aabf99';  // Replace with your actual API key
const defaultLocation = 'Unknown Location'; // Default location in case of error

// Navigation links
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Regional', href: '#', current: false },
  { name: 'Tickets', href: '/booktickets', current: false },
  { name: 'Videos', href: '/videos', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { user, setUser, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState('');
  const [manualLocation, setManualLocation] = useState(''); // Store manually entered location
  const [suggestions, setSuggestions] = useState([]); // State for location suggestions
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const navigate=useNavigate();
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&language=en&q=${latitude}+${longitude}`
              );

              const state = response.data.results[0].components.state;
              setLocation(state || defaultLocation);
            } catch (error) {
              console.error("Error getting user location:", error);
              setLocation(defaultLocation);
            }
          },
          (error) => {
            console.error("Error getting user location:", error);
            setLocation(defaultLocation);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser");
        setLocation(defaultLocation);
      }
    };

    getUserLocation();
  }, []);

  // Handle manual location input change
  const handleLocationChange = async (e) => {
    const query = e.target.value;
    setManualLocation(query);

    if (query.length >= 3) { // Fetch suggestions if query length is >= 3 characters
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&language=en&q=${query}`
        );
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setSuggestions([]);
      }

      setIsLoading(false);
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleLocationSubmit = () => {
    setLocation(manualLocation || defaultLocation);
    setSuggestions([]); // Clear suggestions after submitting
    setIsModalOpen(false); // Close the modal after selection
  };

  const handleSuggestionClick = (suggestion) => {
    setManualLocation(suggestion.formatted); // Set the input to the selected suggestion
    setLocation(suggestion.formatted); // Set the location to the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
    setIsModalOpen(false); // Close the modal after selection
  };

  // Function to set the location to the current location
  const setCurrentLocation = () => {
    setLocation(location || defaultLocation);
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); 
    navigate('/'); 
  };

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-[#ae8625] via-[#d2ac47] to-[#926f34] fixed z-10 w-full top-0">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          {/* Main content */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <svg className="h-8 w-auto" width="50" height="10" viewBox="0 0 50 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <svg className='h-8 w-auto' width="50" height="10" viewBox="0 0 50 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.84 0.719999V0.599999H2.976V0.719999H2.388V8.88H2.976V9H0.84V8.88H1.392V0.719999H0.84ZM8.91703 9C8.58903 9 8.33703 8.928 8.16103 8.784C7.99303 8.64 7.90503 8.496 7.89703 8.352L7.88503 8.148V4.38C7.88503 3.748 7.72103 3.344 7.39303 3.168C7.22503 3.088 7.01703 3.048 6.76903 3.048C6.25703 3.048 5.79703 3.252 5.38903 3.66C4.98103 4.06 4.77703 4.42 4.77703 4.74V9H3.93703V3H4.77703V4.368C4.91303 4.024 5.16503 3.704 5.53303 3.408C5.90103 3.104 6.30503 2.952 6.74503 2.952C7.18503 2.952 7.54103 2.996 7.81303 3.084C8.09303 3.164 8.29703 3.28 8.42503 3.432C8.62503 3.68 8.72503 4 8.72503 4.392V8.148C8.72503 8.38 8.76903 8.56 8.85703 8.688C8.95303 8.808 9.04903 8.872 9.14503 8.88L9.27703 8.904H9.64903V9H8.91703ZM13.7574 3.42C13.6294 3.316 13.4214 3.228 13.1334 3.156C12.8534 3.084 12.6414 3.048 12.4974 3.048C12.3534 3.048 12.2694 3.048 12.2454 3.048C11.8134 3.056 11.5014 3.168 11.3094 3.384C11.1174 3.592 11.0214 3.828 11.0214 4.092C11.0214 4.356 11.1054 4.58 11.2734 4.764C11.4414 4.94 11.6494 5.08 11.8974 5.184C12.1534 5.28 12.4254 5.392 12.7134 5.52C13.0094 5.648 13.2814 5.78 13.5294 5.916C13.7854 6.044 13.9974 6.236 14.1654 6.492C14.3334 6.74 14.4174 7.052 14.4174 7.428C14.4174 7.804 14.2854 8.124 14.0214 8.388C13.7574 8.652 13.4614 8.828 13.1334 8.916C12.8134 9.004 12.4654 9.048 12.0894 9.048C11.2734 9.048 10.6614 8.868 10.2534 8.508L10.3254 8.436C10.4854 8.588 10.7214 8.712 11.0334 8.808C11.3534 8.904 11.6614 8.952 11.9574 8.952C12.4294 8.952 12.8174 8.824 13.1214 8.568C13.4334 8.304 13.5894 7.98 13.5894 7.596C13.5894 7.204 13.4734 6.892 13.2414 6.66C13.0094 6.42 12.7254 6.236 12.3894 6.108C12.0614 5.972 11.7294 5.84 11.3934 5.712C11.0574 5.576 10.7734 5.392 10.5414 5.16C10.3094 4.92 10.1934 4.644 10.1934 4.332C10.1934 4.02 10.2654 3.768 10.4094 3.576C10.5534 3.376 10.7454 3.236 10.9854 3.156C11.3934 3.02 11.8014 2.952 12.2094 2.952C12.8974 2.952 13.4334 3.08 13.8174 3.336L13.7574 3.42ZM15.2559 3.096V3H15.5079V1.8H16.3479V3H18.1839V3.096H16.3479V7.464C16.3479 7.984 16.4039 8.36 16.5159 8.592C16.6359 8.824 16.8799 8.94 17.2479 8.94C17.6239 8.94 18.0039 8.864 18.3879 8.712L18.4239 8.808C18.0239 8.96 17.5639 9.036 17.0439 9.036C16.5319 9.036 16.1479 8.932 15.8919 8.724C15.6359 8.508 15.5079 8.084 15.5079 7.452V3.096H15.2559ZM24.0454 9C23.5014 9 23.1294 8.896 22.9294 8.688C22.7454 8.512 22.6534 8.36 22.6534 8.232V7.98C22.2614 8.692 21.6334 9.048 20.7694 9.048C19.7614 9.048 19.1894 8.592 19.0534 7.68C19.0374 7.584 19.0294 7.488 19.0294 7.392C19.0294 7.288 19.0454 7.176 19.0774 7.056C19.1094 6.936 19.2014 6.804 19.3534 6.66C19.6574 6.372 20.3254 6.196 21.3574 6.132C21.6134 6.108 21.8494 6.096 22.0654 6.096C22.2814 6.096 22.4774 6.104 22.6534 6.12V4.128C22.6374 4.12 22.6374 4.084 22.6534 4.02C22.6694 3.948 22.6534 3.86 22.6054 3.756C22.5654 3.644 22.5094 3.536 22.4374 3.432C22.3654 3.328 22.2374 3.24 22.0534 3.168C21.8694 3.088 21.6294 3.048 21.3334 3.048C21.0374 3.048 20.6894 3.104 20.2894 3.216C19.8974 3.32 19.6094 3.424 19.4254 3.528L19.3774 3.444C20.0894 3.116 20.8134 2.952 21.5494 2.952C22.3734 2.952 22.9174 3.1 23.1814 3.396C23.3894 3.628 23.4934 3.872 23.4934 4.128V8.148C23.4934 8.38 23.5374 8.56 23.6254 8.688C23.7214 8.808 23.8174 8.872 23.9134 8.88L24.0454 8.904H24.4174V9H24.0454ZM20.9614 8.952C21.3854 8.952 21.7654 8.808 22.1014 8.52C22.4454 8.224 22.6294 7.94 22.6534 7.668V6.216C22.4374 6.2 22.2174 6.192 21.9934 6.192C21.7774 6.192 21.5614 6.204 21.3454 6.228C20.7374 6.3 20.3414 6.436 20.1574 6.636C19.9734 6.836 19.8814 7.112 19.8814 7.464C19.8814 7.528 19.8854 7.6 19.8934 7.68C19.9654 8.528 20.3214 8.952 20.9614 8.952ZM25.672 0.696C26.6 0.631999 27.42 0.599999 28.132 0.599999C30.108 0.599999 31.096 1.26 31.096 2.58C31.096 3.076 30.952 3.504 30.664 3.864C30.376 4.216 29.916 4.456 29.284 4.584C29.892 4.656 30.372 4.84 30.724 5.136C31.076 5.432 31.252 5.948 31.252 6.684C31.252 8.228 30.264 9 28.288 9H25.672V0.696ZM26.668 8.88H28.288C29 8.88 29.504 8.696 29.8 8.328C30.104 7.952 30.256 7.38 30.256 6.612C30.256 5.844 30.104 5.332 29.8 5.076C29.496 4.82 29.044 4.684 28.444 4.668H26.668V8.88ZM28.132 0.719999C27.668 0.719999 27.18 0.747999 26.668 0.804V4.548H28.444C29.572 4.5 30.136 3.852 30.136 2.604C30.136 1.996 29.968 1.532 29.632 1.212C29.296 0.883999 28.796 0.719999 28.132 0.719999ZM34.9998 9.048C34.1598 9.048 33.4758 8.808 32.9478 8.328C32.4198 7.848 32.1558 7.108 32.1558 6.108C32.1558 5.108 32.4278 4.332 32.9718 3.78C33.5238 3.228 34.2198 2.952 35.0598 2.952C35.9078 2.952 36.5958 3.192 37.1238 3.672C37.6518 4.152 37.9158 4.892 37.9158 5.892C37.9158 6.892 37.6398 7.668 37.0878 8.22C36.5438 8.772 35.8478 9.048 34.9998 9.048ZM35.0838 3.048C34.4758 3.048 33.9718 3.32 33.5718 3.864C33.1718 4.4 32.9718 5.152 32.9718 6.12C32.9718 7.08 33.1558 7.792 33.5238 8.256C33.8918 8.72 34.3798 8.952 34.9878 8.952C35.5958 8.952 36.0998 8.684 36.4998 8.148C36.8998 7.604 37.0998 6.852 37.0998 5.892C37.0998 4.924 36.9158 4.208 36.5478 3.744C36.1798 3.28 35.6918 3.048 35.0838 3.048ZM41.7146 9.048C40.8746 9.048 40.1906 8.808 39.6626 8.328C39.1346 7.848 38.8706 7.108 38.8706 6.108C38.8706 5.108 39.1426 4.332 39.6866 3.78C40.2386 3.228 40.9346 2.952 41.7746 2.952C42.6226 2.952 43.3106 3.192 43.8386 3.672C44.3666 4.152 44.6306 4.892 44.6306 5.892C44.6306 6.892 44.3546 7.668 43.8026 8.22C43.2586 8.772 42.5626 9.048 41.7146 9.048ZM41.7986 3.048C41.1906 3.048 40.6866 3.32 40.2866 3.864C39.8866 4.4 39.6866 5.152 39.6866 6.12C39.6866 7.08 39.8706 7.792 40.2386 8.256C40.6066 8.72 41.0946 8.952 41.7026 8.952C42.3106 8.952 42.8146 8.684 43.2146 8.148C43.6146 7.604 43.8146 6.852 43.8146 5.892C43.8146 4.924 43.6306 4.208 43.2626 3.744C42.8946 3.28 42.4066 3.048 41.7986 3.048ZM46.3111 -7.15256e-07V5.976L48.9511 3H49.0711L47.1151 5.208L49.6951 9H48.8551L46.6351 5.736L46.3111 6.108V9H45.4711V-7.15256e-07H46.3111Z" fill="white" />
                </svg>
              </svg>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-[#956d13] text-white' : 'text-gray-300 hover:bg-[#b5873e] hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Location and User Profile */}
          <div className="absolute inset-y-0 right-0 gap-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Location input */}
            <a
              onClick={() => setIsModalOpen(true)} // Open the modal
              className="cursor-pointer flex items-center text-white"
            >
              {/* For larger screens, show the location text */}
              <span className="hidden sm:block ">
                {location ? `Location: ${location}` : 'Set Location'}
              </span>

              {/* For smaller screens, show just the chevron down icon */}
              <ChevronDownIcon className="sm:hidden h-5 w-5 text-white" />
            </a>
            {/* Notification Icon */}
            <button
              type="button"
              className="relative rounded-full p-1 text-white hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* User menu */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full text-sm focus:outline-none hover:scale-125 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {user ? ( // Check if user is logged in
                    <img
                      alt="User Avatar"
                      src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <span className="h-8 w-8 rounded-full text-white flex items-center justify-center"><FontAwesomeIcon icon={faUser}/></span> 
                  )}
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gradient-to-r from-[#ae8625] via-[#d2ac47] to-[#926f34] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  {user ? (
                    <>
                      <MenuItem>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700">
                          Your Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Logout
                        </button>
                      </MenuItem>
                    </>
                  ) : (
                    <MenuItem>
                      <Link to="/logsign" className="block px-4 py-2 text-sm text-gray-700">
                        Login
                      </Link>
                    </MenuItem>
                  )}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Modal for changing location */}
      {isModalOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-gradient-to-r from-[#3e0000] to-[#4f0809] rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-lg font-semibold text-white">Select Location</h2>
          <div className="flex flex-col space-y-4">
            {/* Option 1: Set a new location */}
            <div>
              <input
                type="text"
                value={manualLocation}
                onChange={handleLocationChange}
                placeholder="Search for a location..."
                className="w-full p-2 border rounded-md"
              />
              {isLoading ? (
                <p className="text-white">Loading...</p>
              ) : (
                <ul className="mt-4 max-h-40 overflow-auto bg-gradient-to-r from-[#ae8625] via-[#d2ac47] to-[#926f34]">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="cursor-pointer p-2 hover:scale-110"
                    >
                      {suggestion.formatted}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Option 2: Use current location */}
            <button
              onClick={setCurrentLocation}
              className="bg-[#d2ac47] text-white px-4 py-2 rounded-md"
            >
              Use Current Location ({location || 'Unknown'})
            </button>

            {/* Actions */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLocationSubmit}
                className="bg-[#d2ac47] text-white px-4 py-2 rounded-md"
              >
                Set Location
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
      <DisclosurePanel className="sm:hidden fixed z-10 inset-0 top-16 left-0 w-64 bg-gradient-to-r from-[#ae8625]  via-[#d2ac47] to-[#926f34] transform transition-transform duration-300 ease-in-out">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-[#956d13] text-white' : 'text-gray-300 hover:bg-[#b5873e] hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}