import { Routes } from '@angular/router';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { CourseMaterialComponent } from '../course-material/course-material.component';
import { StudentCommentsComponent } from './student-comments/student-comments.component';

const routes: Routes = [
  {
    path: '',
    component: MyCoursesComponent,
    title: 'Techno Square | Courses',
  },
  {
    path: 'profile',
    component: StudentProfileComponent,
    title: 'Techno Square | Courses',
  },
  {
    path: 'course-material/:id',
    component: CourseMaterialComponent,
    title: 'Techno Square | Dashboard',
  },
  {
    path: 'sessions-comment/:id',
    component: StudentCommentsComponent,
    title: 'Techno Square | Dashboard',
  },

];

export default routes;
