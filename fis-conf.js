

fis.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('sass', {compressed : true}),
    postprocessor: fis.plugin('autoprefixer', {
        // browsers: ['> 1% in CN', "last 2 versions", "IE >= 8"] // pc
        browsers: ["Android >= 4", "ChromeAndroid > 1%", "iOS >= 6"] // wap
    })
  });

fis.match('*.jade', {
  rExt: '.html',
  loaderLang: 'html',
  parser: fis.plugin('jade', {
    pretty  : true
  })
});


fis.match('/app/js/**.js', {
  isMod: true
})


fis.set('project.fileType.text', 'es6');
fis.match('*.es6', {
    rExt: '.js',
    parser: fis.plugin('es6-babel', {})
});

// fis.hook('relative'); 

// fis.match('**', { relative: true })
// function replacer(opt) {
//     if (!Array.isArray(opt)) {
//         opt = [opt];
//     }
//     var r = [];
//     opt.forEach(function (raw) {
//         r.push(fis.plugin('replace', raw));
//     });
//     return r;
// };





fis.media('prod')
    // .match('/app/19/**', {
    //     release: './../avon/Web/$0',
    //     url:'$0'
    // })
    .match('/app/static/**', {
        release: './../shenhua/Web/$0',
        url:'$0'
    })
    // .match('/y16c11comment_index.jade', {
    //     release: './../avon/Web/Views/default/activity/y16c11comment/$0',
    //     url:'$0'
    // })
    // .match('/sign*.jade', {
    //     release: './../ido/Web/Views/default/sign/$0',
    //     url:'$0'
    // })
    
    

    // .match('*', {
    //   deploy: fis.plugin('local-deliver', {
    //     to: '/Users/liufeilai/site/avona/Web/'
    //   })
    // })


// fis.hook('amd'{
//   baseUrl: './modules',
//   paths: {
//     $: 'jquery/jquery-1.11.2.js'
//   }
// })

// fis.hook('relative'); 
 
// fis.match('**', { relative: true })

// fis.match('::package', {
//     postpackager: fis.plugin('loader', {
//         resourceType: 'commonJs',
//         useInlineMap: true // 资源映射表内嵌
//     })
// })

// fis.match('::packager', {
//   postpackager: fis.plugin('loader', {
//     allInOne: true
//   })
// });

// fis.match('*.{css,scss}', {
//   optimizer: fis.plugin('clean-css')
// });


// fis.match('*.js', {
//   optimizer: fis.plugin('uglify-js')
// });