import { NextPage } from "next";
import dynamic from "next/dynamic";

interface Props {
  route: string | string[];
}

const DynamicRoute: NextPage<Props> = ({ route }) => {
  console.log(route);
  const Component = dynamic(() => import(`@/features/${route}`));
  return <Component />;
};

export const getServerSideProps = ({ params }: any) => {
  return { props: { route: params?.route ?? "" } };
};

export default DynamicRoute;
