import { Routes } from '@angular/router';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { EnrollComponent } from './enroll/enroll.component';

const routes: Routes = [
  {
    path: '',
    component: AllCoursesComponent,
    title: 'Techno Square | All Courses',
  },
  {
    path: ':id',
    component: CourseDetailsComponent,
    title: 'Techno Square | Courses',
    children: [
      {
        path: 'enroll',
        component: EnrollComponent,
      },
    ],
  },
];

export default routes;
