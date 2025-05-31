package com.mathtrix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }


    public Optional<UserEntity> getUserByUid(String uid) {
        return userRepository.findByUid(uid);
    }

    public UserEntity createUser(UserEntity user) {
        return userRepository.save(user);
    }

    public Optional<UserEntity> updateUser(String id, UserEntity user) {
        return userRepository.findByUid(id).map(existingUser -> {
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setRole(user.getRole());
            existingUser.setDescription(user.getDescription());
            existingUser.setCreatedAt(user.getCreatedAt());
            return userRepository.save(existingUser);
        });
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}