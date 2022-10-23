import { useMemo } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { isSchoolData, SchoolType } from '@/types/schools';
import { schools as schoolsApi } from '@/utils/api';

type UseSchoolType = {
  schoolId?: string | string[];
  dependsOn?: unknown;
};

const useSchool = ({ schoolId, dependsOn = true }: UseSchoolType) => {
  const schoolQuery = useQuery(['school', schoolId], () => schoolsApi.findById(schoolId), { enabled: !!schoolId && !!dependsOn });
  const { data } = schoolQuery;

  const school: SchoolType | null = isSchoolData(data) ? data : null;
  const schoolDefaultValues = useMemo(() => (isSchoolData(data) ? data : {}), [data]);

  const createSchool = useMutation((data: SchoolType) => {
    return schoolsApi.create(data);
  });

  const editSchool = useMutation((data: SchoolType) => {
    return schoolsApi.edit(schoolId, data);
  });

  const deleteSchool = useMutation(() => {
    return schoolsApi.delete(schoolId);
  });

  return {
    schoolQuery,
    school,
    schoolDefaultValues,
    createSchool,
    editSchool,
    deleteSchool,
  };
};

export default useSchool;
