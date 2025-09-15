<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleBasedAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        
        $response = $this->actingAs($admin)->get('/dashboard');
        
        $response->assertStatus(200);
    }

    public function test_user_redirected_to_user_dashboard_when_accessing_admin_area(): void
    {
        $user = User::factory()->create(['role' => 'User']);
        
        $response = $this->actingAs($user)->get('/dashboard');
        
        $response->assertRedirect('/user-dashboard');
    }

    public function test_agent_redirected_to_agent_dashboard_when_accessing_admin_area(): void
    {
        $agent = User::factory()->create(['role' => 'Agent']);
        
        $response = $this->actingAs($agent)->get('/dashboard');
        
        $response->assertRedirect('/agent-dashboard');
    }

    public function test_user_can_access_user_dashboard(): void
    {
        $user = User::factory()->create(['role' => 'User']);
        
        $response = $this->actingAs($user)->get('/user-dashboard');
        
        $response->assertStatus(200);
    }

    public function test_admin_redirected_to_admin_dashboard_when_accessing_user_area(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        
        $response = $this->actingAs($admin)->get('/user-dashboard');
        
        $response->assertRedirect('/dashboard');
    }

    public function test_agent_can_access_agent_dashboard(): void
    {
        $agent = User::factory()->create(['role' => 'Agent']);
        
        $response = $this->actingAs($agent)->get('/agent-dashboard');
        
        $response->assertStatus(200);
    }

    public function test_user_redirected_to_user_dashboard_when_accessing_agent_area(): void
    {
        $user = User::factory()->create(['role' => 'User']);
        
        $response = $this->actingAs($user)->get('/agent-dashboard');
        
        $response->assertRedirect('/user-dashboard');
    }

    public function test_login_redirects_admin_to_admin_dashboard(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        
        $response = $this->post('/login', [
            'email' => $admin->email,
            'password' => 'password',
        ]);
        
        $response->assertRedirect('/dashboard');
    }

    public function test_login_redirects_user_to_user_dashboard(): void
    {
        $user = User::factory()->create(['role' => 'User']);
        
        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
        
        $response->assertRedirect('/user-dashboard');
    }

    public function test_login_redirects_agent_to_agent_dashboard(): void
    {
        $agent = User::factory()->create(['role' => 'Agent']);
        
        $response = $this->post('/login', [
            'email' => $agent->email,
            'password' => 'password',
        ]);
        
        $response->assertRedirect('/agent-dashboard');
    }
}
