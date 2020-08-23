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
import java.sql.Date;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomeController {
    @Autowired
    FileInforRepository fileInforRepo;

    @PostMapping("/upload-one-file")
    public ResponseEntity<Object> upload(HttpServletRequest req, @RequestParam(name = "file") MultipartFile file,
                                         @RequestParam(name = "des") String des, @RequestParam(name = "date") Date date){
        String basePath = req.getServletContext().getRealPath("/directory");
        File folder = new File(basePath);
        if (!folder.exists()) {
            folder.mkdir();
        }
        String fileName = file.getOriginalFilename();
        String filePath = basePath +"/"+ fileName;


        if(fileName != null && fileName.length() > 0) {
            File fileServer = new File(filePath);

            try {
                //save file
                file.transferTo(fileServer);
                //save file infor
                FileInfor fileInfor = new FileInfor();
                fileInfor.setUrl("/directory/"+fileName);
                fileInfor.setDes(des);
                fileInfor.setDate(date);
                if(checkImage(fileName)){
                    fileInfor.setType("image");
                }
                else{
                    fileInfor.setType("video");
                }
                fileInforRepo.save(fileInfor);

            } catch (IllegalStateException | IOException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public boolean checkImage(String name){
        String inversiveName = "";
        for(int i = name.length()-1; i>=0; i--){
            inversiveName += name.charAt(i);
        }
        inversiveName = inversiveName.toLowerCase();
        if(inversiveName.indexOf("gpj.")==0||inversiveName.indexOf("gepj.")==0||inversiveName.indexOf("gnp.")==0){
            return true;
        }
        return false;
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
