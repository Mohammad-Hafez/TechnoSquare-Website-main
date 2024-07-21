import { Routes } from '@angular/router';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CourseStudentsComponent } from './course-students/course-students.component';
import { InstructorProfileComponent } from './profile/instructor-profile.component';
import { CourseMaterialComponent } from '../course-material/course-material.component';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MyCoursesComponent,
    title: 'Techno Square | Courses',
  },
  {
    path: 'profile',
    component: InstructorProfileComponent,
    title: 'Techno Square | Courses',
  },
  {
    path: 'course-material/:id',
    component: CourseMaterialComponent,
    title: 'Techno Square | Dashboard',
  },
  {
    path: ':id',
    component: CourseStudentsComponent,
    title: 'Techno Square | Courses',
  },
];

export default routes;
