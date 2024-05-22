export interface NewsProps {
  newId: number;
  title: string;
  content: string;
  pontuation?: string;
  link?: string;
  author?: string;
  source?: string;
  influence?: string[]

}

export interface NewsRoot {
  success: boolean
  data: Data
}

export interface Data {
  totalItens: number
  content: Content[]
}

export interface Content {
  contentId: number
  providerConfigurationId: number
  contentUrl: string
  title: string
  content: string
  tags: string[]
  assets: Asset[]
  priority: number
  imageUrl: string
  contentType: number
  resourceType: number
  isSponsored: boolean
  isInstitutional: boolean
  assetsSerialized: string
  tagsSerialized: string
  publishDate: string
  publishDate_F: string
}

export interface Asset {
  assetId: number
  ticker: string
  isMainContentAsset: boolean
  categoryType: number
  identificationType: number
  normalizedTicker: string
  assetUrl: string
  assetMainId?: number
}
