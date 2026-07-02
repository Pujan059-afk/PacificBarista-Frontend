import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Certifications from './pages/Certifications';
import Trainers from './pages/Trainers';
import Workshops from './pages/Workshops';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Enroll from './pages/Enroll';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';
import AddEditCourse from './pages/admin/AddEditCourse';
import ManageBlogs from './pages/admin/ManageBlogs';
import AddEditBlog from './pages/admin/AddEditBlog';
import ManageTrainers from './pages/admin/ManageTrainers';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageGallery from './pages/admin/ManageGallery';
import ManageWorkshops from './pages/admin/ManageWorkshops';
import ManageEnrollments from './pages/admin/ManageEnrollments';
import ManageContacts from './pages/admin/ManageContacts';
import NewsletterSubscribers from './pages/admin/NewsletterSubscribers';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:slug" element={<CourseDetail />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="trainers" element={<Trainers />} />
              <Route path="workshops" element={<Workshops />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="enroll" element={<Enroll />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courses" element={<ManageCourses />} />
              <Route path="courses/new" element={<AddEditCourse />} />
              <Route path="courses/edit/:id" element={<AddEditCourse />} />
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="blogs/new" element={<AddEditBlog />} />
              <Route path="blogs/edit/:id" element={<AddEditBlog />} />
              <Route path="trainers" element={<ManageTrainers />} />
              <Route path="testimonials" element={<ManageTestimonials />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="workshops" element={<ManageWorkshops />} />
              <Route path="enrollments" element={<ManageEnrollments />} />
              <Route path="contacts" element={<ManageContacts />} />
              <Route path="newsletter" element={<NewsletterSubscribers />} />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
