import { graphql } from "@/shared/graphql/generated/gql";

/**
 * GraphQL documents of the notice domain (UI read model, decision T12). The typed documents under
 * `shared/graphql/generated/` are generated from these plus the backend's schema. Since T22 that
 * generation runs in trellis-backend and ships in @trellis/contracts, so changing a document here
 * means changing it there as well and consuming a new contracts version (scripts/check-contracts.mjs).
 */
export const NoticeDetailDocument = graphql(`
  query NoticeDetail($code: ID!) {
    notice(code: $code) {
      code
      title
      body
      severity
      audience
      status
      publishedAt
      stats {
        publishCount
        lastPublishedAt
      }
    }
  }
`);
