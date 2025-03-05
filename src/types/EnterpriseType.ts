export interface UserInfo {
    id: number;
    name: string;
    username: string;
    is_admin: boolean;
    company_id: number | null;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
    updated_by: number | null;
    deleted_by: number | null;
}

export interface CompanyInfo {
    id?: number;
    name: string;
    description?: string | null;
    industry?: string | null;
    cnpj?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    website?: string | null;
    input_endpoint?: string | null;
    output_endpoint?: string | null;
    ai_type?: string | null;
    ai_model?: string | null;
    ai_token?: string | null;
    business_type?: string | null;
    status: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
    updated_by: number | null;
    deleted_by: number | null;
}

export interface MeResponse {
    token: any;
    user: UserInfo;
    company: CompanyInfo;
}

export interface ProdutoType {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    company_id: number;
    company?: CompanyInfo;
    code: string;
    created_at?: string;
    updated_at?: string | null;
    deleted_at?: string | null;
    updated_by?: number | null;
    deleted_by?: number | null;
}

export interface ServiceType {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    company_id: number;
    company?: CompanyInfo;
    code: string;
    created_at?: string;
    updated_at?: string | null;
    deleted_at?: string | null;
    updated_by?: number | null;
    deleted_by?: number | null;
}

export interface AssistenteType {
    id?: number;
    company_id: number;
    client_name?: string | null;
    client_contact?: string | null;
    outcome?: string | null;
    interest?: string | null;
    interaction_summary?: string | null;
    estimated_value?: number | null;
    notes?: string | null;
    created_at?: string;
    updated_at?: string | null;
    deleted_at?: string | null;
    updated_by?: number | null;
    deleted_by?: number | null;
    company?: CompanyInfo;
}