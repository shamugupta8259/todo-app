import './App.css';
import About from './components/About';
import Home from './components/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import AlertState from './context/notes/AlertState';
function App() {

  return (
    <>
      <NoteState>
        <AlertState>
        <BrowserRouter  >
          <Navbar />
          <Alert/>
          <div className='container'>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/about" element={<About />} />
          </Routes>
          </div>
        </BrowserRouter>
        </AlertState>
      </NoteState>

    </>
  );
}

export default App;







// createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root />}>
//       <Route path="contact" element={<Contact />} />
//       <Route
//         path="dashboard"
//         element={<Dashboard />}
//         loader={({ request }) =>
//           fetch("/api/dashboard.json", {
//             signal: request.signal,
//           })
//         }
//       />
//       <Route element={<AuthLayout />}>
//         <Route
//           path="login"
//           element={<Login />}
//           loader={redirectIfUser}
//         />
//         <Route path="logout" action={logoutUser} />
//       </Route>
//     </Route>
//   )
// );

// Or use plain objects
// createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "contact",
//         element: <Contact />,
//       },
//       {
//         path: "dashboard",
//         element: <Dashboard />,
//         loader: ({ request }) =>
//           fetch("/api/dashboard.json", {
//             signal: request.signal,
//           }),
//       },
//       {
//         element: <AuthLayout />,
//         children: [
//           {
//             path: "login",
//             element: <Login />,
//             loader: redirectIfUser,
//           },
//           {
//             path: "logout",
//             action: logoutUser,
//           },
//         ],
//       },
//     ],
//   },
// ]);