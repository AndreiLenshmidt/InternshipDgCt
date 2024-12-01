import { ProjectPage } from '@/modules/ProgectsPage/ProjectPage';
import Layout from '@/modules/ProgectsPage/components/layout'

export default function ProjectRoute() {
   return <ProjectPage />;
}

ProjectRoute.getLayout = function getLayout(page: React.ReactNode) {
   return <Layout>{page}</Layout>;
};