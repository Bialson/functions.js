import {
	GizmoHelper as FiberGizmoHelper,
	GizmoHelperProps,
	GizmoViewport,
} from '@react-three/drei';

export const AxesHelper = ({ visible }: { visible: boolean }) => (
	<axesHelper args={[1]} visible={visible} />
);

export const GizmoHelper: React.FC = (props: GizmoHelperProps) => (
	<FiberGizmoHelper alignment="top-right" margin={[80, 80]} {...props}>
		<GizmoViewport labelColor="white" />
	</FiberGizmoHelper>
);
