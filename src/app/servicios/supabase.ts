import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})

export class Supabase {
    private supabase: SupabaseClient;

    private supabaseUrl = 'https://vjaljnsfhqvgnevqvxew.supabase.co';
    private supabaseKey = 'sb_publishable_VXF0Mm2iSLOwalsBuPwr0w_9TEGFmaE';

    constructor() {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    get client() {
        return this.supabase;
    }
}