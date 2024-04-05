type Role = 'ShiftManager' | 'Nurse' | 'PracticingDoctor';

interface Card {
  title: string;
  clipart: string;
  description: string;
  route: string;
}

const getRoleBasedCards = (role: Role): Card[] => {
  switch (role) {
    case 'ShiftManager':
      return [
        {
          title: 'View Admitted Patients',
          clipart: '🛌',
          description: 'Click to view admitted patients.',
          route: '/shift-manager/viewAdmittedPatients',
        },
        {
          title: 'View Doctors',
          clipart: '👩‍⚕️',
          description: 'Click to view doctors.',
          route: '/shift-manager/viewDoctors',
        },
        {
          title: 'View Nurses',
          clipart: '👩‍⚕️',
          description: 'Click to view nurses.',
          route: '/shift-manager/viewNurses',
        },
        {
          title: 'View Activity Logs',
          clipart: '📊',
          description: 'Click to view activity logs.',
          route: '/shift-manager/viewActivityLogs',
        },
      ];
    case 'Nurse':
      return [
        {
          title: 'View/Attend Patient in Ward',
          clipart: '🛌',
          description: 'Click to view/attend patients in the ward.',
          route: '/nurse/viewPatients',
        },
        {
          title: 'View Doctors in Assigned Ward',
          clipart: '👩‍⚕️',
          description: 'Click to view doctors in the assigned ward.',
          route: '/nurse/viewDoctors',
        },
        {
          title: 'View Nurses in Ward',
          clipart: '👩‍⚕️',
          description: 'Click to view nurses in the ward.',
          route: '/nurse/viewNurses',
        },
      ];
    case 'PracticingDoctor':
      return [
        {
          title: 'Indoor Mode',
          clipart: '🏥',
          description: 'Click to enter indoor mode.',
          route: '/doctor/indoorMode',
        },
        {
          title: 'Outdoor Mode',
          clipart: '🌳',
          description: 'Click to enter outdoor mode.',
          route: '/doctor/outdoorMode',
        },
        {
          title: 'Out of Office Mode',
          clipart: '🏡',
          description: 'Click to enter out of office mode.',
          route: '/doctor/outOfOfficeMode',
        },
      ];
    default:
      return [];
  }
};

export default getRoleBasedCards;
