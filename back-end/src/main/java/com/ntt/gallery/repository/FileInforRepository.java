package com.ntt.gallery.repository;

import com.ntt.gallery.entity.FileInfor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileInforRepository extends JpaRepository<FileInfor,Integer> {
    FileInfor findById(int id);
    List<FileInfor> findByDesContaining(String des);
}
