import ConfigureTest from './components/configure-test/ConfigureTest';
import CreateTests from './components/create-tests.tsx/CreateTests';
import SuccessStep from './components/success-step/SuccessStep';
import TestPreview from './components/test-preview/TestPreview';

export const steps = [
  { title: 'Configure Test', component: ConfigureTest },
  { title: 'Create Tests', component: CreateTests },
  { title: 'Review & Publish', component: TestPreview },
  { title: 'Success!', component: SuccessStep },
];
