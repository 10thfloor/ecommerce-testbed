export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string
          id: string
          price: number
          product_id: number
          quantity: number
          size: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          product_id: number
          quantity: number
          size?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          product_id?: number
          quantity?: number
          size?: string | null
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          description: string | null
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      collections: {
        Row: {
          description: string | null
          end_date: string
          id: number
          image: string | null
          is_active: boolean
          name: string
          start_date: string
          theme_primary: string | null
          theme_secondary: string | null
        }
        Insert: {
          description?: string | null
          end_date: string
          id?: number
          image?: string | null
          is_active?: boolean
          name: string
          start_date: string
          theme_primary?: string | null
          theme_secondary?: string | null
        }
        Update: {
          description?: string | null
          end_date?: string
          id?: number
          image?: string | null
          is_active?: boolean
          name?: string
          start_date?: string
          theme_primary?: string | null
          theme_secondary?: string | null
        }
        Relationships: []
      }
      product_sizes: {
        Row: {
          id: number
          inventory: number
          name: string
          product_id: number
        }
        Insert: {
          id?: number
          inventory?: number
          name: string
          product_id: number
        }
        Update: {
          id?: number
          inventory?: number
          name?: string
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_sizes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number
          collection_id: number | null
          created_at: string
          description_en: string
          description_fr: string
          description_ja: string
          id: number
          image: string
          inventory: number
          is_limited_edition: boolean | null
          name: string
          price: number
        }
        Insert: {
          category_id: number
          collection_id?: number | null
          created_at?: string
          description_en: string
          description_fr: string
          description_ja: string
          id?: number
          image: string
          inventory?: number
          is_limited_edition?: boolean | null
          name: string
          price: number
        }
        Update: {
          category_id?: number
          collection_id?: number | null
          created_at?: string
          description_en?: string
          description_fr?: string
          description_ja?: string
          id?: number
          image?: string
          inventory?: number
          is_limited_edition?: boolean | null
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_cart_items: {
        Row: {
          created_at: string
          id: string
          price: number
          product_id: number
          quantity: number
          saved_cart_id: string
          size: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          product_id: number
          quantity: number
          saved_cart_id: string
          size?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          product_id?: number
          quantity?: number
          saved_cart_id?: string
          size?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_cart_items_saved_cart_id_fkey"
            columns: ["saved_cart_id"]
            isOneToOne: false
            referencedRelation: "saved_carts"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_carts: {
        Row: {
          cart_id: string
          created_at: string
          date: string
          id: string
          user_id: string
        }
        Insert: {
          cart_id: string
          created_at?: string
          date: string
          id?: string
          user_id: string
        }
        Update: {
          cart_id?: string
          created_at?: string
          date?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      saved_for_later: {
        Row: {
          created_at: string
          id: string
          price: number
          product_id: number
          quantity: number
          size: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          product_id: number
          quantity: number
          size?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          product_id?: number
          quantity?: number
          size?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stock_watch: {
        Row: {
          created_at: string
          id: string
          notifications_enabled: boolean
          product_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notifications_enabled?: boolean
          product_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notifications_enabled?: boolean
          product_id?: number
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_stock_notifications: {
        Args: {
          user_uuid: string
        }
        Returns: {
          product_id: number
          notifications_enabled: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
