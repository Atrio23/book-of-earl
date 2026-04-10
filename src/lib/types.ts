export interface Recipient {
  readonly email: string;
  readonly name?: string;
  readonly type?: string;
}

export interface Email {
  readonly id: string;
  readonly gmail_id: string;
  readonly thread_id: string;
  readonly sender_email: string;
  readonly sender_name: string;
  readonly subject: string;
  readonly body_text: string;
  readonly body_html: string;
  readonly date_sent: string;
  readonly recipients: readonly Recipient[];
  readonly cc_recipients: readonly Recipient[];
  readonly labels: readonly string[];
  readonly has_attachments: boolean;
  readonly snippet: string;
  readonly primary_category: string | null;
  readonly categories: readonly string[];
}

export interface EmailListItem {
  readonly id: string;
  readonly subject: string;
  readonly date_sent: string;
  readonly snippet: string;
  readonly primary_category: string | null;
}

export interface PhotoRow {
  readonly id: string;
  readonly filename: string;
  readonly storage_path: string;
  readonly public_url: string | null;
  readonly date_taken: string | null;
  readonly caption: string | null;
  readonly sort_order: number;
}

export interface Database {
  public: {
    Tables: {
      emails: {
        Row: Email;
        Insert: Email;
        Update: Partial<Email>;
      };
      recipients: {
        Row: {
          readonly id: string;
          readonly email_id: string;
          readonly email_address: string;
          readonly name: string;
          readonly recipient_type: string;
        };
        Insert: never;
        Update: never;
      };
      photos: {
        Row: PhotoRow;
        Insert: PhotoRow;
        Update: Partial<PhotoRow>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
