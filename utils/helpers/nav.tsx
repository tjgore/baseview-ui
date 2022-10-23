let cacheSchoolId: string | string[] | undefined = '';

type PrimaryNavType = { id: string; name: string; link: string; current: boolean };

type BuildPrimaryNavType = (pathname: string, { schoolId }: { schoolId: string | string[] | undefined }) => PrimaryNavType[];

export const buildPrimaryNav: BuildPrimaryNavType = (pathname, { schoolId }) => {
  cacheSchoolId = schoolId ? schoolId : cacheSchoolId;
  const primaryNavigation = [
    { id: 'overview', name: 'Overview', link: '/overview', current: false },
    { id: 'classes', name: 'Classes', link: '/classes', current: false },
    { id: 'accounts', name: 'Accounts', link: '/accounts', current: false },
    { id: 'schedule', name: 'Schedule', link: '/schedule', current: false },
    { id: 'settings', name: 'Settings', link: '/settings', current: false },
  ];

  if (['/schools', '/schools/create'].includes(pathname)) {
    return [{ id: 'schools', name: 'Schools', link: '/schools', current: true }];
  }

  const currentPath = pathname.replace('[id]', cacheSchoolId as string);

  return setCurrent(primaryNavigation, currentPath);
};

/** Set current url path for the primary navigation */
const setCurrent = (primaryNavigation: PrimaryNavType[], pathname: string) => {
  const currentPath = pathname.replace('[id]', cacheSchoolId as string);

  return primaryNavigation.map(nav => {
    nav.link = `/schools/${cacheSchoolId}${nav.link}`;
    nav.current = nav.link === currentPath || currentPath.includes(nav.link);
    return nav;
  });
};
