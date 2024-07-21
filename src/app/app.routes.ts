import { Routes } from '@angular/router';
import { WebsiteComponent } from './website/website.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Techno Square | Login',
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: WebsiteComponent,
    title: 'Techno Square | Website',
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'Techno Square | Home',
      },
      {
        path: 'instructor',
        component: DashboardComponent,
        title: 'Techno Square | Dashboard',
        loadChildren: () =>
          import('./pages/dashboard/instructor/instructor.routes'),
        canActivate: [authGuard],
      },
      {
        path: 'student',
        component: DashboardComponent,
        title: 'Techno Square | Dashboard',
        loadChildren: () => import('./pages/dashboard/student/student.routes'),
        canActivate: [authGuard],
      },

      {
        path: 'courses',
        loadComponent: () =>
          import('./pages/courses/courses.component').then(
            (c) => c.CoursesComponent
          ),
        title: 'Techno Square | Courses',
        loadChildren: () => import('./pages/courses/courses.routes'),
      },

      {
        path: 'events',
        loadComponent: () =>
          import('./pages/events/events.component').then(
            (c) => c.EventsComponent
          ),
        title: 'Techno Square | Events',
      },

      {
        path: 'contact-us',
        loadComponent: () =>
          import('./pages/contact-us/contact-us.component').then(
            (c) => c.ContactUsComponent
          ),
        title: 'Techno Square | Contact Us',
      },

      {
        path: 'about-us',
        loadComponent: () =>
          import('./pages/about-us/about-us.component').then(
            (c) => c.AboutUsComponent
          ),
        title: 'Techno Square | About Us',
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Techno Square | 404 Not Found',
  },
];
