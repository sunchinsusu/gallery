package com.ntt.gallery.controller;

import com.ntt.gallery.entity.FileInfor;
import com.ntt.gallery.repository.FileInforRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomeController {
    @Autowired
    FileInforRepository fileInforRepo;

    @PostMapping("/upload-one-file")
    public ResponseEntity<Object> upload(HttpServletRequest req, @RequestParam(name = "file") MultipartFile file, @RequestParam(name = "des") String des){
        String basePath = req.getServletContext().getRealPath("/directory");
        File folder = new File(basePath);
        if (!folder.exists()) {
            folder.mkdir();
        }
        String imageName = file.getOriginalFilename();
        String imagePath = basePath +"/"+ imageName;


        if(imageName != null && imageName.length() > 0) {
            File fileServer = new File(imagePath);

            try {
                file.transferTo(fileServer);
                FileInfor fileInfor = new FileInfor();
                fileInfor.setUrl("/directory/"+imageName);
                fileInfor.setDes(des);
                fileInforRepo.save(fileInfor);

            } catch (IllegalStateException | IOException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @GetMapping("/get-all")
    public ResponseEntity<Object> getAll(){
        return new ResponseEntity<>(fileInforRepo.findAll(),HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Object> getById(@PathVariable(name = "id")int id){
        return new ResponseEntity<>(fileInforRepo.findById(id),HttpStatus.OK);
    }
}
