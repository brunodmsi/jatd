import React from 'react';

const Header: React.FC = () => {
	return (
		<header
			className="bg-indigo-500 p-6"
		>
			<div className="items-center text-white">
				<span className="font-semibold text-xl tracking-tight">Just Another Todo List</span>
			</div>
			{/* <div className="block lg:hidden">
				<button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
				</button>
			</div>
			<div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
				<div className="text-sm lg:flex-grow">
					<a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
						Docs
					</a>
					<a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
						Examples
					</a>
					<a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
						Blog
					</a>
				</div>
			</div> */}
		</header>
	);
} 

export default Header;