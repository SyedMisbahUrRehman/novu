import { Module, Provider } from '@nestjs/common';
import {
  AddDelayJob,
  MergeOrCreateDigest,
  AddJob,
  BullMqService,
  bullMqTokenList,
  BulkCreateExecutionDetails,
  CalculateLimitNovuIntegration,
  CompileEmailTemplate,
  CompileTemplate,
  CreateExecutionDetails,
  GetDecryptedIntegrations,
  GetLayoutUseCase,
  GetNovuLayout,
  GetNovuProviderCredentials,
  GetSubscriberPreference,
  GetSubscriberGlobalPreference,
  GetSubscriberTemplatePreference,
  ProcessTenant,
  OldInstanceBullMqService,
  QueuesModule,
  SelectIntegration,
  SendTestEmail,
  SendTestEmailCommand,
  StoreSubscriberJobs,
  ConditionsFilter,
  TriggerEvent,
  MapTriggerRecipients,
  GetTopicSubscribersUseCase,
  getIsTopicNotificationEnabled,
  SubscriberJobBound,
} from '@novu/application-generic';
import { JobRepository } from '@novu/dal';

import {
  ActiveJobsMetricService,
  CompletedJobsMetricService,
  StandardWorker,
  WorkflowWorker,
  OldInstanceWorkflowWorker,
  OldInstanceStandardWorker,
} from './services';

import {
  MessageMatcher,
  SendMessage,
  SendMessageChat,
  SendMessageDelay,
  SendMessageEmail,
  SendMessageInApp,
  SendMessagePush,
  SendMessageSms,
  Digest,
  GetDigestEventsBackoff,
  GetDigestEventsRegular,
  HandleLastFailedJob,
  QueueNextJob,
  RunJob,
  SetJobAsCompleted,
  SetJobAsFailed,
  UpdateJobStatus,
  WebhookFilterBackoffStrategy,
} from './usecases';

import { SharedModule } from '../shared/shared.module';
import { SubscriberProcessWorker } from './services/subscriber-process.worker';

const REPOSITORIES = [JobRepository];

const USE_CASES = [
  AddDelayJob,
  MergeOrCreateDigest,
  AddJob,
  CalculateLimitNovuIntegration,
  CompileEmailTemplate,
  CompileTemplate,
  CreateExecutionDetails,
  ConditionsFilter,
  BulkCreateExecutionDetails,
  Digest,
  GetDecryptedIntegrations,
  GetDigestEventsBackoff,
  GetDigestEventsRegular,
  GetLayoutUseCase,
  GetNovuLayout,
  GetNovuProviderCredentials,
  SelectIntegration,
  GetSubscriberPreference,
  GetSubscriberGlobalPreference,
  GetSubscriberTemplatePreference,
  HandleLastFailedJob,
  MessageMatcher,
  ProcessTenant,
  QueueNextJob,
  RunJob,
  SendMessage,
  SendMessageChat,
  SendMessageDelay,
  SendMessageEmail,
  SendMessageInApp,
  SendMessagePush,
  SendMessageSms,
  SendTestEmail,
  SendTestEmailCommand,
  StoreSubscriberJobs,
  SetJobAsCompleted,
  SetJobAsFailed,
  TriggerEvent,
  UpdateJobStatus,
  WebhookFilterBackoffStrategy,
  MapTriggerRecipients,
  GetTopicSubscribersUseCase,
  getIsTopicNotificationEnabled,
  SubscriberJobBound,
];

const PROVIDERS: Provider[] = [
  ActiveJobsMetricService,
  BullMqService,
  bullMqTokenList,
  CompletedJobsMetricService,
  StandardWorker,
  WorkflowWorker,
  SubscriberProcessWorker,
  OldInstanceBullMqService,
  OldInstanceStandardWorker,
  OldInstanceWorkflowWorker,
];

@Module({
  imports: [SharedModule, QueuesModule],
  controllers: [],
  providers: [...PROVIDERS, ...USE_CASES, ...REPOSITORIES],
})
export class WorkflowModule {}
