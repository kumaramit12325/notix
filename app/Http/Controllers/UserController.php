<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        
        $users = User::paginate($perPage)->through(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'phone' => $user->phone ?? 'N/A',
                'email' => $user->email,
                'role' => $user->role ?? 'User',
                'status' => $user->status ?? 'Active',
                'created_at' => $user->created_at->format('M d, Y'),
            ];
        });

        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        $roles = ['User', 'Agent']; 
        return Inertia::render('users/create', [
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:Admin,User,Agent',
            'status' => 'required|string|in:Active,Inactive',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Hash the password before creating user
        $validated['password'] = bcrypt($validated['password']);

        User::create($validated);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        return Inertia::render('users/show', [
            'user' => $user
        ]);
    }

    public function edit(User $user)
    {
        $roles = ['User', 'Agent'];
        return Inertia::render('users/edit', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:Admin,User,Agent',
            'status' => 'required|string|in:Active,Inactive',
        ]);

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
