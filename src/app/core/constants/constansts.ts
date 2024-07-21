export const constants = {
    TECHNO_TOKEN: 'TECHNO_TOKEN',
  };
  
  const apiurl = 'https://admin.mtechsquare.com/api';
  
  export const apiEndpoint = {
    AuthEndpoint: {
      student_login: `${apiurl}/student_login`,
      instructor_login: `${apiurl}/instructor_login`,
      student_logout: `${apiurl}/student_logout`,
      instructor_logout: `${apiurl}/instructor_logout`,
      loggedInstructor: `${apiurl}/user`,
      loggedStudent: `${apiurl}/student`,
    },
  };