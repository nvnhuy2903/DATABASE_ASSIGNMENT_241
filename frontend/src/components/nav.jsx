import { Link } from "react-router-dom";

function navbar() {
    return (
        <>
        <nav class="border-gray-200" style = {{backgroundImage: "linear-gradient(rgb(26, 0, 26), rgba(26, 0, 26, .7) ,rgba(51, 0, 51, .0))", height: 120 + 'px'}}>
            <div class="max-w-screen flex flex-wrap items-center justify-between p-3">
            <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo_main_page.png" class="absolute top-2 h-20" alt="Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pl-20"> Football tournament </span>
            </Link>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-white rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
                <li>
                    <Link to="/" class="h-10 w-20 duration-300 content-center text-center block py-2 px-3 text-gray-900 rounded-xl hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-main-color dark:hover:bg-white dark:hover:text-white">Home</Link>
                </li>
                <li style={{marginLeft: 10 + 'px'}}>
                    <Link to="/match" class="h-10 w-20 duration-300 content-center text-center block py-2 px-3 text-gray-900 rounded-xl hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-main-color dark:hover:bg-white dark:hover:text-white">Match</Link>
                </li>
                <li style={{marginLeft: 10 + 'px'}}>
                    <Link to="/rank" class="h-10 w-20 duration-300 content-center text-center block py-2 px-3 text-gray-900 rounded-xl hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-main-color dark:hover:bg-white dark:hover:text-white">Rank</Link>
                </li>
                <li style={{marginLeft: 10 + 'px'}}>
                    <Link to="/stat" class="h-10 w-20 duration-300 content-center text-center block py-2 px-3 text-gray-900 rounded-xl hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-main-color dark:hover:bg-white dark:hover:text-white">Statistic</Link>
                </li>
                <li style={{marginLeft: 10 + 'px'}}>
                    <Link to="/club" class="h-10 w-20 duration-300 content-center text-center block py-2 px-3 text-gray-900 rounded-xl hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-main-color dark:hover:bg-white dark:hover:text-white">Club</Link>
                </li>
                <li style={{marginLeft: 10 + 'px'}}>
                    <Link to="/player" class="h-10 w-20 mr-5 ml-0 duration-300 content-center text-center block py-2 px-3 text-gray-900 rounded-xl hover:bg-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-main-color dark:hover:bg-white dark:hover:text-white">Player</Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
        </>
    );
}

export default navbar;